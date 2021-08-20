import { useSession } from "../lib/react/session.hook";

export default function Index(): JSX.Element {
  const { session } = useSession();

  if (!session) return <p>Du er ikke innlogget</p>;

  return <p>Tada! Nå er du innlogget</p>;
}
