{   
    let deleteAll=function()
    {
        let deletButtons=document.querySelectorAll('.delete-post-button');
        for(i of deletButtons)
        {   console.log(i);
            deletePost(i);

        }
    }



    let showNoti=function(data)
    {
        if(data.flash.success && data.flash.success.length>0){
            new Noty({
                    type: 'success',
                    layout: 'topRight',
                    text: data.flash.success,
                    theme:'relax',
                    timeout:1500
                }).show();
        }
        if(data.flash.error && data.flash.error.length>0){
            new Noty({
                    theme:'relax',
                    type: 'error',
                    layout: 'topRight',
                    text: data.flash.error,
                    timeout:1500
                }).show();
        }
          
    }
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
               deletePost($(' .delete-post-button',newPost)); // passing only class without newPost will not work also put space
               $('#post-list').prepend(newPost);
               console.log(data);
               showNoti(data);
               newPostFrom.value="";
               
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
       
            <a class="delete-post-button" href="/post/destroy/${i._id}" style="display: inline;">X</a>
            
    
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
    let deletePost=function(deletelink)
    {    // delete link will  contain query selecter corresponding to that
        $(deletelink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),//not /post/delte as it contains the param so prop gives the href
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    showNoti(data);

                } , //gets the data from server 
             error:   function(err){
                 console.log(err.responseText);
             }
            });

        });
    }
    createPost();
    deleteAll();
    
}
// See in create post there is always one form to be taken care of 
// so we call the function and it detects the click of it
// but this is not the case in delete
// we have to call it after every post is created
//but on reloading everything is rendered again so we have to call for every delete link again