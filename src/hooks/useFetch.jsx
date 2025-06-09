export const httpConfig = async (
  url,
  method,
  objConfig = null,
  taskId = null
) => {
  const finalUrl = taskId ? `${url}/${taskId}` : url;
  const config = {
    method,
    headers: {
      "Content-type": "application/json",
    },
  };

  if (objConfig && (method === "POST" || method === "PATCH")) {
    config.body = JSON.stringify(objConfig);
  }

  try {
    const response = await fetch(finalUrl, config);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao fazer requisição:", error.message);
    return null;
  }
};
