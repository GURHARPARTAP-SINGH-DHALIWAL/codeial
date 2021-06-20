{   
   let createPost=function(){
   // to prevent reloading we are using ajax to collect form data 
   let newPostFrom=$('#post-form');
   newPostFrom.submit(function(e){
       e.preventDefault();
       $.ajax({
           type:'post',
           url:'/post/create',
           data:newPostFrom.serialize(),
           success:function(data)
           {   
               //New Post will conatina html object correspinding to that psot
               let newPost=newPostDOM(data.data.post);
               $('#post-list').prepend(newPost);
           },
           error:function(error)
           {
               console.log(error.responseText);
           }

           
       });
   });
    }

    let newPostDOM=function(i){
        return $(`  <li id="post-${i._id}">
       
            <a class="delete-post-button" href="/post/destroy/<%=i.id%>" style="display: inline;">X</a>
            
    
    <h2>${i.content} By ${i.user.name}</h2>
    <div class="post-comments">
    
    <form action="/comment/create" method="POST" >
    <input type="text" name="comment" id="comment" placeholder="Add Comment" required>
    <input type="hidden" name="post" value="${i._id}">
    <input type="submit" value="Add Comment">
    
    </form>
    
    <h3>Comments</h3>
    <section>
    <ul id="comment-post-${i._id}>
   
    </ul>
    </section>
    </li>
    
    
    `);
    }
    createPost();
    
}