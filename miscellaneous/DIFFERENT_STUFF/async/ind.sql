//
///
select rank() over(partition by .. order by comments.user_id) as rank from users inner join comments on users.id = comments.user_id


//
select * from comments where id in (
    select max(id) from comments
    group by user_id
)