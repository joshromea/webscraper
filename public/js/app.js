
$(document).on('click', '.savebutton', (event) => {
    let id = $(this).attr('data-articleId')
    console.log(id)
    $.ajax({
        method: 'PUT',
        url: '/articles/' + id
    }).then((data) => {
        return
    })
})

$('.unsavebutton').on('click', (event) => {
    let unSavedAricle = $(this).data()
    unSavedAricle.saved = true
    let id = $(this).attr('data-articleId')
    $.ajax('/saved/' + id, {
        type: 'PUT',
        data: unSavedAricle
    }).then((data) => {
        location.reload()
    })
})

$('.scrapebutton').on('click', (event) => {
    $.ajax({ type: 'GET', url: '/scrape' })
        .then((data) => {
            location.reload()
        })
})





