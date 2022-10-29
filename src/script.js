function changeTab(event, tabId) {
  document.querySelector('.tab.active')?.classList.remove('active')
  document.querySelector('.tab-pane.active')?.classList.remove('active')

  event.target?.classList.add('active')
  document.querySelector(`.tab-pane#${tabId}`)?.classList.add('active')
}

async function sendRequest(event) {
  event.preventDefault()
  event.stopPropagation()

  const $url = document.querySelector('#url')
  const $method = document.querySelector('#method')
  const $body = document.querySelector('#body')

  const response = await requestrAPI.request({
    method: $method.value,
    url: $url.value,
    data: $body.value
  })

  await setResponse(response)
}

async function setResponse(response) {
  const $response_status = document.querySelector('.response-status')
  const $response_time = document.querySelector('.response-time')
  const $response_size = document.querySelector('.response-size')

  $response_status.innerText = `${response.status} ${response.statusText}`
  $response_time.innerText = response.duration + ' ms'
  $response_size.innerText = response.headers['content-length'] + ' B'

  if (response.headers['content-type'].includes('application/json')) {
    return setResponseJSON(response.data)
  }

  return setResponseRaw(response.data)
}

function setResponseRaw(data) {
  const $response_data = document.querySelector('.response-data')
  $response_data.innerText = data
}

function setResponseJSON(data) {
  const $response_data = document.querySelector('.response-data')
  $response_data.innerText = JSON.stringify(data, null, '  ')
}