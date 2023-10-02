const listContainer = document.getElementById("list-container");
const form = document.getElementById("form")


form.addEventListener("submit", function(event) {
    event.preventDefault();
    const input = document.getElementById("input-box").value;
    if (input === '') {
        alert("Please enter a value");
    }
    else {
        form.submit();
    }
})

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        const taskId = e.target.id;
        fetch(`/toggle_check/${taskId}`, { method: 'POST' })
    }
}, false);


const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const taskId = button.parentNode.id;
        fetch(`/delete/${taskId}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    button.parentNode.remove();
                } else {
                    console.error('Failed to delete task');
                }
            });
    });
});

window.onload = () => {
    document.getElementById("input-box").focus();
}
