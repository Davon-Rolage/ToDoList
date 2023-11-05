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

$(".task").click(function(e) {
    const taskId = $(this).closest(".task").attr("id");
    $(this).closest(".task").toggleClass("checked");
    fetch(`/toggle_check/${taskId}`, { method: 'POST' });
    
    if ($(this).hasClass("checked")) {
        $(this).find("img").attr("src", "../static/images/checked.png");
    } else {
        $(this).find("img").attr("src", "../static/images/unchecked.png");
    }
});

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

$(".delete-x").hover(function(e) {
    const task = $(e.target.parentNode.parentNode).find(".task");
    task.css("background-color", "rgba(255, 0, 0, 0.25)");
}, function(e) {
    const task = $(e.target.parentNode.parentNode).find(".task");
    task.css("background-color", "");
})

$(document).ready(function() {
    $("#input-box").focus();
})

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