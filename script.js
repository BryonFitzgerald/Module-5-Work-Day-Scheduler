const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17']

const localeSet = {}; 
dayjs.locale(localeSet);

  
  const thisHour = dayjs().format('H'); 
  console.log(thisHour);
  
    $('.time-block').each(function() {
      const timeBlockHour = parseInt(this.id);
      $(this).toggleClass('past', timeBlockHour < thisHour );
      $(this).toggleClass('present', timeBlockHour === thisHour );
      $(this).toggleClass('future', timeBlockHour > thisHour );
    });

  function saveToLocal() {
    $('.saveBtn').on('click', function() {
      const keyInput = $(this).parent().attr('id');
      const valueInput = $(this).siblings('.description').val();
      localStorage.setItem(keyInput, valueInput);
    });
  }

  function changeColor() {
    $('.time-block').each(function() {
      const timeBlockHour = parseInt(this.id);
      if ( timeBlockHour == thisHour ) {
        $(this).removeClass('past', 'future').addClass('present');
      } else if ( timeBlockHour < thisHour ) {
        $(this).removeClass('present', 'future').addClass('past');
      } else ( timeBlockHour > thisHour )
        $(this).removeClass('past', 'present').addClass('future');
    });
  
    $('.time-block').each(function() {
      const keyInput = $(this).attr('id');
      const valueInput = localStorage.getItem(keyInput);
      console.log(keyInput);
      console.log(valueInput);
      $(this).children('.description').val(valueInput || ''); 
    });
  }
  
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const dateNow = dayjs().format('MMM D, YYYY A');
    const timeNow = dayjs().format('hh:mm:ss');
    dateElement.text(dateNow);
    timeElement.text(timeNow);
  }
  function newRow() {
    var rowElement = $('.container-lg');
    const content = `
    <div id="hour-12" class="row time-block past">
    <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
    </div>
    `;
    rowElement.html(content); 
  
  hourColor();
  saveToLocal();
  changeColor();
  newRow();
  setInterval(updateTime, 1000); 
}; 

