function LogoBold() {
  return (
    <h1 className="text-7xl font-semibold tracking-wide text-accent-shade-900">
      <span className="select-none">
        Cu<span className="uppercase text-accent-shade-500">p</span>id
      </span>
    </h1>
  );
}
function Logo({ variant = "normal" }: { variant?: "normal" | "bold" }) {
  if (variant === "normal") {
    return (
      <div>
      <h1 className="text-4xl font-bold">
        cu<span className="upper">p</span>id
      </h1>
      </div>
    );
  } else {
    return <LogoBold />;
  }
}

export default Logo;

