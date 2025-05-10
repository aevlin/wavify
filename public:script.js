document.querySelector(".btn").addEventListener("click", async function () {
    const input = document.querySelector("input").value;
    if (!input) return alert("Please enter a YouTube link!");

    const loader = document.querySelector(".progress");
    loader.style.width = "0%";
    loader.innerText = "0%";

    try {
        const res = await fetch("/api/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: input }),
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        document.querySelector(".download-section").style.display = "block";
        document.querySelector(".video-details h3").innerText = data.title;
        document.querySelector(".video-details p").innerText = data.channel;
        document.querySelector(".thumbnail img").src = data.thumbnail;
        document.querySelector(".download-button").href = data.downloadUrl;

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            loader.style.width = progress + "%";
            loader.innerText = progress + "%";
            if (progress >= 100) clearInterval(interval);
        }, 100);
    } catch (err) {
        console.error(err);
        alert("Something went wrong.");
    }
});
