import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlilce";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onclick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
