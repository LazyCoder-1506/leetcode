var all_questions = []

$(document).ready(function () {
  fetchQuestions()
})

function fetchQuestions () {
  var questions_xhr = $.getJSON("data.json", {
    format: "json"
  })
  .done(function (data) {
    all_questions = data
    all_questions.sort((a,b) => a.likes < b.likes ? 1 : (a.likes > b.likes ? -1 : 0))
    var i = 0
    for (let question_obj of all_questions) {
      i++
      var question_url = 'https://leetcode.com/problems/' + question_obj.titleSlug
      question_obj.tagsArray = question_obj.topicTags.substring(0, question_obj.topicTags.length - 1).split(';')
      var tags_html = ''
      for (let tag of question_obj.tagsArray) {
        tags_html += `<span class="badge badge-pill mb-2 badge_tags ml-2">${tag}</span>`
      }
      var question_html = `<div class="row mx-0 pt-2 question_item ${i%2 ? 'alternate' : ''}" id="question_${question_obj.questionId}">
        <div class="col-12 col-lg-6 mb-2">
          <a href="${question_url}" class="question_link">${question_obj.questionId}. ${question_obj.title}</a>
        </div>
        <div class="col-4 col-md-2 col-lg-1 mb-2 text-center">
          <span class="text-light" data-toggle="tooltip" data-placement="top" data-title="${question_obj.likes} likes">${question_obj.likes}</span>
        </div>
        <div class="col-4 col-md-2 col-lg-1 mb-2 text-center">
          <span class="text-light" data-toggle="tooltip" data-placement="top" data-title="${question_obj.dislikes} dislikes">${question_obj.dislikes}</span>
        </div>
        <div class="col-4 col-md-2 col-lg-1 mb-2 text-center">
          <span class="text-light" data-toggle="tooltip" data-placement="top" data-html="true" title="Accepted : ${question_obj.totalAccepted}<br>Submitted : ${question_obj.totalSubmission}<br>Acceptance Rate : ${question_obj.acRate}">${question_obj.acRate}</span>
        </div>
        <div class="col-4 col-md-2 col-lg-1 mb-2 text-center">
          <span class="${question_obj.difficulty.toLowerCase()}">${question_obj.difficulty}</span>
        </div>
        <div class="col-4 col-md-2 col-lg-1 mb-2 text-center">
          <span class="text-light">${question_obj.isPaidOnly ? 'Paid' : 'Free'}</span>
        </div>
        <div class="col-4 col-md-2 col-lg-1 mb-2 text-center">
          ${question_obj.hasSolution ? '<i class="far fa-file-alt mx-1 solution_icon" data-toggle="tooltip" data-placement="top" data-title="Solution Available"></i>' : ''}
          ${question_obj.hasVideoSolution ? '<i class="far fa-file-video mx-1 video_icon" data-toggle="tooltip" data-placement="top" data-title="Video Solution Available"></i>' : ''}
        </div>
        <div class="col-12 mb-2">
          <span class="badge badge-pill mb-2 badge_category">${question_obj.categoryTitle}</span>
          ${tags_html}
        </div>
      </div>`
      $('#questions_cont').append(question_html)
    }
    $('[data-toggle="tooltip"]').tooltip()
  });
}