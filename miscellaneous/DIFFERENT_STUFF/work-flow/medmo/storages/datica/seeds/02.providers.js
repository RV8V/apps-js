exports.seed = async (knex) => {
  return knex('providers')
    .del()
    .then(async () => {
      await knex.raw(`
        INSERT INTO providers VALUES
          (1, 'FB', 'Fran',      'Bania',      '(555) 120-0239', '2002/04/04', '00552', 'ijlduTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', '@-12"<?',    3, now(), now()),
          (2, 'KD', 'Kim',       'Dwyre',      '(555) 311-5417', '2001/03/07', '00263', 'qercuTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', 'ld/+6-h',    9, now(), now()),
          (3, 'JJ', 'Janice',    'Reisman',    '(555) 091-7524', '2000/02/01', '00301', 'rtvgyTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', '#4-}{=]}',  11, now(), now()),
          (4, 'DK', 'Digna',     'Kaminsky',   '(555) 841-3412', '1999/01/09', '00436', 'ujsgrTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', '+0Llu9*()', 12, now(), now()),
          (5, 'SD', 'Samy',      'Delahanty',  '(555) 002-0094', '1998/12/02', '00607', '[libsTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', '(&#~&())',  13, now(), now()),
          (6, 'SH', 'Sonya',     'Harbold',    '(555) 235-8811', '1997/11/05', '01254', 'qaserTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', 'J0HL&||!',  14, now(), now()),
          (7, 'FB', 'Feras',     'Bania',      '(555) 636-7608', '1996/10/12', '02386', '[;l,mTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', '=_0*!kh&',  15, now(), now()),
          (8, 'JM', 'Jefferson', 'Monachelli', '(555) 346-2355', '1995/09/08', '03542', 'pithbTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', '+(RT-+))',  16, now(), now()),
          (9, 'RM', 'Rianna',    'Murphy',     '(555) 588-7467', '1994/08/10', '06300', '[-09iTk2ZmI4MTU5MDIwNDM5ZmIxNGExMWZlN2FiNjU4M2IuZDZmNTQ1ZTQzMTJkOTFjNDQzMzkwZjRmOGZiMTliMTI2ZjY4MjEyOWY5NzMyYmQ0Yzg3NjJjZTJlNWQ2MzRkNjo', '**@jNk&&',  17, now(), now());
      `);
  });
}
