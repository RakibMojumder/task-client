import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Form from "./Form";
import Users from "./Users";

const Home = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], async () => {
    const res = await axios.get("https://task-server-chi.vercel.app/users");
    return res.data.data;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Form refetch={refetch} />
      <Users users={users} refetch={refetch} isLoading={isLoading} />
    </div>
  );
};

export default Home;
