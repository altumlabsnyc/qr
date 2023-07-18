interface Props {
  error: any;
}

export default function GeneralError({ error }: Props) {
  return (
    <div>
      <h1 className="text-red-400">an error has occured</h1>
      <p>{JSON.stringify(error)}</p>
      <p>please contact altum labs for help</p>
    </div>
  );
}
