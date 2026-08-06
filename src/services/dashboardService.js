export async function getDashboard() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {

        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }

    return data;

}