package intro

class Block {
  // { is a block returned result is last line
  // }

  def block: Unit = println({
    val x = 20
    x + 20
  })
}