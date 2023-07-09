import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { LngLat, Map, Marker } from 'mapbox-gl'

interface MarkerAndColor {
  color: string
  marker: Marker
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef
  public markers: MarkerAndColor[] = []

  public map?: Map
  public currentLngLat: LngLat = new LngLat(
    -88.03653858892332,
    15.53003574395079
  )

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat,
      zoom: 13
    })

    // const markerHtml = document.createElement('div')
    // markerHtml.innerHTML = 'Ricardo Corrales'

    // const marker = new Marker({
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map)
  }

  createMarker() {
    if (!this.map) return

    const color = '#xxxxxx'.replace(/x/g, y =>
      ((Math.random() * 16) | 0).toString(16)
    )
    const lngLat = this.map.getCenter()

    this.addMarker(lngLat, color)
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return

    const marker = new Marker({
      color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map)

    this.markers.push({ color, marker })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove()
    this.markers.splice(index, 1)
  }
}
