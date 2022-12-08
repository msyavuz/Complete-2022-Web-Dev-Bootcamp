const today = () => {
    return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
};

export {today}