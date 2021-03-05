import React from 'react'
import styles from './postcard.module.css'

function PostCard({name = 'Anonomous'}){
    return(
        <div className={styles.postcard}>
            <div className={styles.post_heading}>
                <div className={styles.post_img}></div>
                <h3 className={styles.name}>{name}</h3>
            </div>
        </div>
    )
}

export default PostCard