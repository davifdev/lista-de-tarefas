import { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const endPoint = import.meta.env.VITE_ENDPOINT;

console.log(endPoint);

export const useFetch = () => {
  const { taskList, setTaskList } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [productId, setProductId] = useState(null);

  const httpConfig = (data, method) => {
    console.log(data, method);
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      setMethod(method);
    }

    if (method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMethod(method);
      setProductId(data);
    }

    if (method === "PATCH") {
      setConfig({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
      setProductId(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(endPoint);
        const json = await res.json();

        setTaskList(json);
      } catch (error) {
        console.log(error.message);
        setError("Ops! Algo deu errado :/");
      }

      setLoading(false);
    };

    fetchData();
  }, [setTaskList, callFetch]);

  useEffect(() => {
    if (method === "POST") {
      const sendData = async () => {
        let fetchOptions = [endPoint, config];
        const res = await fetch(...fetchOptions);
        const json = await res.json();

        setCallFetch(json);
      };
      sendData();
    } else if (method === "DELETE") {
      const deleteData = async () => {
        const deleteURL = `${endPoint}/${productId}`;
        let fetchOptions = [deleteURL, config];

        const res = await fetch(...fetchOptions);
        const json = await res.json();

        setCallFetch(json);
      };

      deleteData();
    }
  }, [config, method, productId]);

  return { taskList, httpConfig, loading, error, setCallFetch };
};
