import { Task } from "@modules/task/task.model.js";
import { Project } from "@modules/project/project.model.js";
import { Member } from "@modules/member/member.model.js";
import { Team } from "@modules/team/team.model.js";
import type { ITask } from "./task.interface.js";
import APIError from "@/errors/APIError.js";
import httpStatus from "http-status";
import TaskPriorityEnum from "@/enums/task.enum.js";
import { ActivityLog } from "@/app/modules/activityLog/activityLog.model.js";

const createTask = async (payload: ITask) => {
  // validate project exists
  const project = await Project.findById(payload.project).lean();
  if (!project) throw new APIError("Project not found", httpStatus.BAD_REQUEST);

  // if assignee provided, validate member exists
  if (payload.assignee) {
    const member = await Member.findById(payload.assignee).lean();
    if (!member)
      throw new APIError("Assignee (Member) not found", httpStatus.BAD_REQUEST);
  }

  payload.team = (project as any).team;

  const created = await Task.create(payload);
  return created;
};

const getTasks = async () => Task.find().lean();

const getTaskById = async (id: string) => {
  const task = await Task.findById(id).lean();
  if (!task) throw new APIError("Task not found", httpStatus.NOT_FOUND);
  return task;
};

const updateTask = async (id: string, payload: Partial<ITask>) => {
  // if project is being changed, validate it and possibly set team from project
  if (payload.project) {
    const project = await Project.findById(payload.project).lean();
    if (!project)
      throw new APIError("Project not found", httpStatus.BAD_REQUEST);
    payload.team = (project as any).team;
  }

  // if assignee provided, validate it exists
  if (payload.assignee) {
    const member = await Member.findById(payload.assignee).lean();
    if (!member)
      throw new APIError("Assignee (Member) not found", httpStatus.BAD_REQUEST);
  }

  const updated = await Task.findByIdAndUpdate(id, payload as any, {
    new: true,
  }).lean();

  return updated;
};

const deleteTask = async (id: string) => {
  const deleted = await Task.findByIdAndDelete(id).lean();
  if (!deleted) throw new APIError("Task not found", httpStatus.NOT_FOUND);
  return deleted;
};

const reassignTask = async () => {
  // fetch all teams
  const teams = await Team.find().lean();

  const overallResult: Array<any> = [];

  for (const team of teams) {
    const teamId = team._id;

    // fetch projects associated with the team
    const projects = await Project.find({ team: teamId }).lean();
    const projectIds = projects.map((p) => p._id);

    // fetch tasks whose project is in the project's list and have an assignee
    const tasks = await Task.find({ project: { $in: projectIds } }).lean();

    // fetch members of the team
    const members = await Member.find({ team: teamId }).lean();

    // Build per-member data: totalTask, availability, eligibleTasks (low/medium)
    const membersData = members.map((member: any) => {
      const assignedTasks = tasks.filter(
        (task) => task.assignee?.toString() === (member._id as any).toString()
      );

      const eligibleTasks = assignedTasks.filter(
        (task: any) =>
          task.priority === TaskPriorityEnum.Low ||
          task.priority === TaskPriorityEnum.Medium
      );

      const totalTask = eligibleTasks.length;
      const availability = member.capacity - totalTask;

      return {
        member,
        totalTask,
        eligibleTasks,
        availability,
      };
    });

    // sort ascending by availability so left = most overloaded (smallest availability)
    membersData.sort(
      (a: any, b: any) =>
        a.availability - b.availability || a.totalTask - b.totalTask
    );

    let left = 0;
    let right = membersData.length - 1;
    const moved: Array<any> = [];

    while (left < right) {
      const L = membersData[left]!;
      const R = membersData[right]!;

      // if left is not overloaded, move left pointer
      if (L.availability >= 0) {
        left++;
        continue;
      }

      // if right has no capacity, move right pointer
      if (R.availability <= 0) {
        right--;
        continue;
      }

      if (L.totalTask <= R.availability) {
        moved.push({
          from: L.member._id,
          to: R.member._id,
          tasks: L.eligibleTasks.map((t: any) => t._id),
        });

        R.availability -= L.totalTask;
        left++;
        continue;
      }

      const tasksToMove = L.totalTask - R.availability;
      L.totalTask -= R.availability;

      // Take the first N tasks
      const tasks = L.eligibleTasks.splice(0, tasksToMove);

      // Push the movement log
      moved.push({
        from: L.member._id,
        to: R.member._id,
        tasks, // moved tasks
      });

      right--;
    }

    await Promise.all(
      moved.map(async (move) => {
        await Promise.all(
          move.tasks.map(async (task: any) => {
            await Task.findByIdAndUpdate(task, { assignee: move.to });
            await ActivityLog.create({
              task,
              from: move.from,
              to: move.to,
            });
          })
        );
      })
    );
  }

  return overallResult;
};

export const TaskService = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  reassignTask,
};
