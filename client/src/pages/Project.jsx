import React from "react";
import { useGetProjectDetailsQuery } from "../services/api";
import Button from "../components/ui/Button";
import UserAvatarGroup from "../components/ui/UserAvatarGroup";
import PriorityBadge from "../components/ui/PriorityBadge";

const Project = () => {
  const { data } = useGetProjectDetailsQuery(
    "taskmanager-website-local-client",
  );

  return;
  <div className="py-40">
    <div className="max-w-4xl m-auto">
      <div className="pb-2 border-b flex justify-between">
        <h1 className="text-2xl ">Task Manager</h1>
        <Button>Add Member</Button>
      </div>

      <div className="flex justify-between border-b">
        <div>
          <h2 className="text-2xl pt-2">{data?.title}</h2>
          <p>{data?.description}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center ">
            Author:
            <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">
              {data?.author.avatar ? (
                <img src={data?.author.avatar} alt="profile" />
              ) : (
                data?.author.fullName?.charAt(0)
              )}
            </div>
            <h2 className=" font-bold">{data?.author.fullName}</h2>
          </div>
          <div>
            Members:
            {data?.members && data?.members.length > 0 && (
              <UserAvatarGroup members={data?.members} />
            )}
          </div>
        </div>
      </div>
      <div className="py-20 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl ">Task List</h2>
          <Button>Add Task</Button>
        </div>
        {data?.tasks.map((item) => (
          <div key={item._id} className="bg-slate-200 p-5 rounded-xl flex justify-between">
            <div>
              <h1 className="text-2xl">{item?.title}</h1>
              <p>{item?.description}</p>
              <div>
                <div>
                Priority: <PriorityBadge priority={item.priority}/>
                <p>{item?.isComplete ? "Completed": "Incomplete"}</p>

                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  </div>;
};

export default Project;
