import { TableCell } from "@ark-market/ui/table";

interface TextCellProps {
  text: string;
}

export default function TextCell({ text }: TextCellProps) {
  return <TableCell className="text-primary">{text}</TableCell>;
}
