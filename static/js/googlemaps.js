fetch('https://api.ipify.org')
.then(response => response.text())
.then(ipdata => {
    ipdataobject = {
        "ipaddress":ipdata
      }
fetch("/iplookup",
{
    method: "POST",
    body: JSON.stringify(ipdataobject), 
    headers: {
      'Content-Type': 'application/json'
      },
  })
.then(response => response.json())
.then(data => {
    emaildetailsoutput = document.getElementById("googlediv")
    googlemapsiframe = document.createElement('iframe')
    googlemapsiframe.setAttribute('width',"300")
    googlemapsiframe.setAttribute('height',"250")
    googlemapsiframe.setAttribute('id',"gmap_canvas")
    googlemapsiframe.setAttribute('src',data["mapinfo"])
    googlemapsiframe.setAttribute('frameborder',"0")
    googlemapsiframe.setAttribute('scrolling',"no")
    googlemapsiframe.setAttribute('marginheight',"no")
    googlemapsiframe.setAttribute('marginwidth',"no")
    googlemapsiframe.style.cssText += "border-radius: 25px;border: 2px solid #73AD21;"
    emaildetailsoutput.appendChild(googlemapsiframe);
}
)
})



