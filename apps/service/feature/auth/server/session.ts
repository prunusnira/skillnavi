export const getServerSession = async () => {
    const res = await fetch('/api/session');
    return res.json();
}