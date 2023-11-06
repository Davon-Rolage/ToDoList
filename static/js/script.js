// Add a task if the input box is not empty
$("#form-add").submit(function(e) {
    e.preventDefault();
    const inputValue = $("#input-box").val().replace(/\s/g, "");
    if (inputValue === '') {
        alert("Please enter a value");
    }
    else {
        e.target.submit();
    }
})

// Toggle checked/unchecked
$(".task-text, .task-img").click(function() {
    const taskId = this.id;
    fetch(`/toggle_check/${taskId}`, { method: 'POST' })
    
    const task = $(this).parent();
    const taskText = task.find(".task-text");
    const checkedImage = task.find(".task-img").find("img");

    taskText.toggleClass("checked");
    if (taskText.hasClass("checked")) {
        checkedImage.attr("src", "../static/images/checked.png");
    } else {
        checkedImage.attr("src", "../static/images/unchecked.png");
    }
})

// Delete task
$(".delete-x").click(function(e) {
    const taskId = e.target.id;
    fetch(`/delete_task/${taskId}`, { method: 'POST' })
        .then(response => {
            if (response.ok) {
                e.target.parentNode.parentNode.remove();
            } else {
                console.error('Failed to delete task');
            }
        })
});

// Delete task hover effect
$(".delete-x").hover(function(e) {
    const task = $(e.target.parentNode.parentNode).find(".task");
    task.css("background-color", "rgba(255, 0, 0, 0.25)");
}, function(e) {
    const task = $(e.target.parentNode.parentNode).find(".task");
    task.css("background-color", "");
})

// Delete all tasks if any
$("#form-delete-all").submit(function(e) {
    e.preventDefault();
    const numTasks = $("#list-container").children().length;
    if (numTasks == 0) {
        return
    } else {
        if (confirm("Delete ALL tasks?")) {
            e.target.submit();
        }
    }
});

// Delete checked tasks if any
$("#form-delete-checked").submit(function(e) {
    e.preventDefault();
    const numChecked = $("#list-container").children().find(".checked").length;
    if (numChecked == 0) {
        return
    } else {
        if (confirm("Delete checked tasks?")) {
            e.target.submit();
        }
    }
})

// Focus on input box when page loads
$(document).ready(function() {
    $("#input-box").focus();
})