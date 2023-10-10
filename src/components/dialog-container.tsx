type DialogContainerProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function DialogContainer({
  children,
  onClick,
}: DialogContainerProps
) {
  return (
    <div
      onClick={onClick}
      className="hover:cursor-pointer hover:bg-secondary hover:text-primary items-center relative flex cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      {children}
    </div>
  );
}
