import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Map, Marker } from 'mapbox-gl'

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent {
  @ViewChild('map') divMap?: ElementRef
  public map?: Map
  @Input() lngLat?: [number, number]

  ngAfterViewInit(): void {
    if (!this.lngLat) throw "LngLat can't be null"
    if (!this.divMap) throw "DivMap can't be null"

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat,
      zoom: 13,
      interactive: false
    })

    new Marker().setLngLat(this.lngLat).addTo(this.map)
  }
}
