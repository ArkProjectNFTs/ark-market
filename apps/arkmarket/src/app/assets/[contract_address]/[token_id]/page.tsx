import Asset from "./components/asset";
import { getCollectionToken } from "./data";

export default async function Token({
  params,
}: {
  params: { contract_address: string; token_id: string };
}) {
  const token = await getCollectionToken(
    params.contract_address,
    params.token_id,
  );

  return (
    <div className="container py-12">
      <Asset token={token} />
    </div>
  );
}
