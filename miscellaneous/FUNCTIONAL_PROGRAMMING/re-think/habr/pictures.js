/**
 * @Functor
 */

// > fmap (+3) (Just 2)
// Just 5

// instance Functor Maybe where
//     fmap func (Just val) = Just (func val)
//     fmap func Nothing = Nothing

// > fmap (+3) Nothing
// Nothing

// > (+) <$> (Just 5)
// Just (+5)
// > Just (+5) <$> (Just 4)
// ОШИБКА??? ЧТО ЭТО ВООБЩЕ ЗНАЧИТ ПОЧЕМУ ФУНКЦИЯ УПАКОВАНА В JUST

/**
 * @Applicative Functor
 */

// Just (+3) <*> Just 2 == Just 5

// > (+) <$> (Just 5)
// Just (+5)
// > Just (+5) <*> (Just 3)
// Just 8
