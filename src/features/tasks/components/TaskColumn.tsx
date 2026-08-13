import { useDroppable } from "@dnd-kit/core";

interface TaskColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function TaskColumn({
  id,
  title,
  children,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
   <div
  ref={setNodeRef}
  className={`rounded-3xl ${
    isOver ? "bg-[#040B11] shadow-inner" : ""
  }`}
>
      <div className="rounded-lg bg-[#040B11] border border-[#1d4b6b] p-4">
        <p className="text-sm text-left font-semibold text-[#64D4FF] mb-4 pb-2">
          {title}
        </p>

        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}