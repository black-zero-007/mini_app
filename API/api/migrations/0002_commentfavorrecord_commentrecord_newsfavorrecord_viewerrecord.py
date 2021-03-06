# Generated by Django 3.1.4 on 2021-01-19 09:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ViewerRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('news', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.news', verbose_name='动态')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.userinfo', verbose_name='用户')),
            ],
        ),
        migrations.CreateModel(
            name='NewsFavorRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('news', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.news', verbose_name='动态')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.userinfo', verbose_name='点赞用户')),
            ],
        ),
        migrations.CreateModel(
            name='CommentRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=255, verbose_name='评论内容')),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='评论时间')),
                ('depth', models.PositiveIntegerField(default=1, verbose_name='层级数')),
                ('favor_count', models.PositiveIntegerField(default=0, verbose_name='点赞数')),
                ('news', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.news', verbose_name='动态')),
                ('reply', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.commentrecord', verbose_name='回复对象')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.userinfo', verbose_name='评论者')),
            ],
        ),
        migrations.CreateModel(
            name='CommentFavorRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.commentrecord', verbose_name='评论')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.userinfo', verbose_name='用户')),
            ],
        ),
    ]
