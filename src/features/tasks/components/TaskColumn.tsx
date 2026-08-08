import { useDroppable } from "@dnd-kit/core";

interface TaskColumnProps {
  id: string;
  children: React.ReactNode;
}

export default function TaskColumn({
  id,
  children,
}: TaskColumnProps) {
  const { setNodeRef, isOver} = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef}
    className={isOver ? "bg-blue-200" : ""}
    >
      {children}
    </div>
  );
}