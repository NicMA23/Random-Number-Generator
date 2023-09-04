document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form-randomizer').addEventListener('submit', function (e) {
        e.preventDefault()
        let maxNum = document.getElementById('max-num').value

        maxNum = parseInt(maxNum)

        let randomNum = Math.floor(Math.random() * maxNum + 1)

        document.querySelector('.number').innerHTML = randomNum
        document.querySelector('.ans').style.display = 'block'
    })
})