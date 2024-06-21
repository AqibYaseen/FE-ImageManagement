import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TImageResponse } from '../../types/image.types';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() Image!: TImageResponse;
  @Output() editImage: EventEmitter<TImageResponse> = new EventEmitter();
  @Output() deleteImage: EventEmitter<TImageResponse> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
