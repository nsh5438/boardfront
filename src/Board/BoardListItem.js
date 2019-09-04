import React from 'react';
import {Link} from 'react-router-dom';
const BoardListItem = (props) => {
    let {post} = props;
    let created = new Date(post.created);
    let link = `/board/view/${post.id}`;

   return (
     <div>
         <ul className='itembar'>

             <li>{post.id}</li>
             <li><Link to={link}>
                 {post.title}
             </Link></li>
             <li>{post.author}</li>
             <li>
                 {created.getFullYear()+"- "}
                 {created.getMonth() + 1 + "- "}
                 {created.getDate()}
             </li>
             <li>{post.like_num}</li>
             <li>{post.view_num}</li>
             <li>{post.kind}</li>
         </ul>
     </div>
   );
};

export default BoardListItem;