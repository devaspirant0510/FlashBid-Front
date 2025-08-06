export function getServerURL(){
    return import.meta.env.VITE_MODE === "development" ? "http://localhost:8080" : `https://${import.meta.env.VITE_SERVER_URL}`
}