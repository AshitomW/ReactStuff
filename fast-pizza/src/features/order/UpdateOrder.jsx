import React from "react";
import Button from "../../ui/Button";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  console.log(request);
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

// Revalidation , react router knows  data has changed result of the action so then it automatically refetches the data in the background and re render the page with new data
