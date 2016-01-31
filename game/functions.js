function checkCollide(hb1, hb2) {

  if (hb1.x < hb2.x + hb2.width &&
   hb1.x + hb1.width > hb2.x &&
   hb1.y < hb2.y + hb2.height &&
   hb1.height + hb1.y > hb2.y) {
    return true;
  }
  else {
    return false;
  }

}
