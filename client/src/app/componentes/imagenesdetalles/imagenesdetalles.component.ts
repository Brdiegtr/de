import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../Servicios/image.service';
import { AuthService } from '../../Servicios/auth.service';
import { CommentService } from '../../Servicios/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imagenesdetalles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './imagenesdetalles.component.html',
  styleUrl: './imagenesdetalles.component.css'
})
export class ImagenesdetallesComponent {
  imagenId: string = '';
  imageData: any = null;
  currentUserId: string = '';

  comments: any[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.imagenId = this.route.snapshot.paramMap.get('id') || '';
    const user = this.authService.getUser();
    this.currentUserId = user?._id || '';

    this.loadImage();
    this.loadComments();
  }

  loadImage() {
    this.imageService.getAllImages().subscribe(images => {
      this.imageData = images.find((img: any) => img._id === this.imagenId);
    });
  }

  loadComments() {
    this.commentService.getComments(this.imagenId).subscribe(data => {
      this.comments = data;
    });
  }

  submitComment() {
  const text = this.newComment.trim();
  if (!text) return;

  this.commentService.addComment(this.imagenId, text).subscribe(comment => {
    this.comments.unshift(comment); // Ya viene con userId.name gracias al populate
    this.newComment = '';
    // this.loadComments(); // ❌ innecesario
  });
}

}
