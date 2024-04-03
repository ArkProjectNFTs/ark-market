import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ark-market/ui/components/avatar";

const AvatarTest = () => {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarTest;
