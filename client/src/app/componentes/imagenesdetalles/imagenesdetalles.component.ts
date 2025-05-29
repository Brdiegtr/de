import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../Servicios/image.service';
import { AuthService } from '../../Servicios/auth.service';
import { CommentService } from '../../Servicios/comment.service';
import { LikeService } from '../../Servicios/like.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imagenesdetalles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './imagenesdetalles.component.html',
  styleUrls: ['./imagenesdetalles.component.css']
})
export class ImagenesdetallesComponent {
  imagenId: string = '';
  imageData: any = null;
  currentUserId: string = '';
  isAuthenticated: boolean = false;

  comments: any[] = [];
  newComment: string = '';

  likeCount: number = 0;
  userLiked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private authService: AuthService,
    private commentService: CommentService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.imagenId = this.route.snapshot.paramMap.get('id') || '';
    this.isAuthenticated = this.authService.isLoggedIn();

    const user = this.authService.getUser();
    this.currentUserId = user?._id || '';

    this.loadImage();
    this.loadComments();
    this.loadLikes();
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
      this.comments.unshift(comment);
      this.newComment = '';
    });
  }

  loadLikes() {
    this.likeService.getLikesCount(this.imagenId).subscribe(data => {
      this.likeCount = data.likes;
    });

    if (this.isAuthenticated) {
      this.likeService.hasUserLiked(this.imagenId).subscribe(data => {
        this.userLiked = data.liked;
      });
    } else {
      this.userLiked = false; // por si acaso
    }
  }

  toggleLike() {
    if (!this.isAuthenticated) {
      alert('Debes iniciar sesión para dar like.');
      return;
    }

    this.likeService.toggleLike(this.imagenId).subscribe(data => {
      this.userLiked = data.liked;
      this.likeCount += this.userLiked ? 1 : -1;
    });
  }
}
