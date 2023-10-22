import React from "react"
const Like = (props) => {
  let classes = "fa fa-thumbs-up"
  if (!props.liked) {
    classes = "fa fa-thumbs-o-up"
  }
  //   console.log(classes)
  return (
    <span
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={props.onLike}
    ></span>
  )
}

export default Like
