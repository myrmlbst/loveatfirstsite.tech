onload = () =>{
        document.body.classList.remove("container");
}

screen.addEventListener("orientationchange", () => {
        screen.orientation.lock();
});
