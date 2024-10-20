class TodoList{
   constructor( id ){
      this.id = id;
   }

   // ** fix todos_input_time_from's value to today's
   fitToday(){
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      
      document.querySelector("#todos_input_time_from").value = `${year}-${month.toString().padStart(2,0)}-${date.toString().padStart(2,0)}`;
   }
   
   // ** formData submit Event
   submit(){
      const selectedValue = document.querySelector("#select_bottom_value");
      
      
      // ** content -> node.js 전송
      const insertContent = ()=>{
         document.querySelector('#todos_input_container').addEventListener('submit', async (evt) => {
            const todos_input_content = document.querySelector("#todos_input_content").value.trim();
            const todos_input_time_from =  document.querySelector("#todos_input_time_from").value.trim();
            const todos_input_time_to =  document.querySelector("#todos_input_time_to").value.trim();
            const selectedValueInnerHTML = selectedValue.innerHTML.trim();
            
            evt.preventDefault(); 
            // 서버로 데이터 전송
            if( selectedValueInnerHTML !== "Select Category" ){
               try {
                  const response = await fetch('/', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ selectedValueInnerHTML,todos_input_content, todos_input_time_from, todos_input_time_to })
                  });
      
                  window.location.reload();
               } catch (e) {
                  console.error('Error:', e);
               }
            }else{
               console.log("바꿔라");
            }
         });
      }

      // ** category -> node.js 전송
      const insertCategory = ()=>{
         document.querySelector('#categories').addEventListener('submit', async (evt) => {
            const inputCategory = document.querySelector("#input_category").value;
            
            evt.preventDefault();
            
            // 서버로 데이터 전송
            try {
               const response = await fetch('/', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ inputCategory })
               })
               
               window.location.reload();
   
            } catch (e) {
               console.error('Error:', e);
            }
         });
      }

      const changeCategoryValue = ()=>{
         const categoryValue = document.querySelectorAll("#select_bottom_options .categoryValue");

         categoryValue.forEach( optionBtn =>{
            optionBtn.addEventListener("click", evt =>{
               categoryValue.forEach( optionBtn => optionBtn.classList.remove("focused") );
               optionBtn.classList.add("focused");
               selectedValue.innerHTML = evt.currentTarget.innerHTML;
            })
         })
      }

      insertContent();
      insertCategory();
      changeCategoryValue();
   }

   // ** filter by the same category in contents
   filterCategory(){
      
   }
   
   
   // ** allMethod run 
   run(){
      this.submit();
      this.fitToday();
   }
}

const todos = new TodoList( 'todos' );
todos.run();