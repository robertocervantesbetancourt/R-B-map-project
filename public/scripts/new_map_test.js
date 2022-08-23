document.querySelector("#push").onclick = function () {
  if (document.querySelector("#newmap input").value.length == 0) {
    alert("Please input something");
  } else {
    document.querySelector("#maps").innerHTML += `
          <div class="map">
              <span id="mapname">
                  ${document.querySelector("#newmap input").value}
              </span>
              <button class="delete"><i class="fa fa-trash"></i></button>
              <button class="icon"><i class="fas fa-heart"></i></i></button>
          </div>
      `;

    var current_maps = document.querySelectorAll(".delete");
    for (var i = 0; i < current_maps.length; i++) {
      current_maps[i].onclick = function () {
        this.parentNode.remove();
      };
    }
  }
};
