function done() {
  alert('達成しました');
  document.todoform.action="/done";
	document.todoform.submit();
}

function deleteTodo() {
  alert('削除しました');
  document.todoform.action="/delete";
	document.todoform.submit();
}

function deleteDone() {
  alert('削除しました');
}