# Generated by Django 3.1.4 on 2021-01-11 08:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cover', models.CharField(max_length=128, verbose_name='封面')),
                ('content', models.CharField(max_length=255, verbose_name='内容')),
                ('address', models.CharField(blank=True, max_length=128, null=True, verbose_name='位置')),
                ('favor_count', models.PositiveIntegerField(default=0, verbose_name='点赞数')),
                ('viewer_count', models.PositiveIntegerField(default=0, verbose_name='浏览数')),
                ('comment_count', models.PositiveIntegerField(default=0, verbose_name='评论数')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='发布时间')),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32, verbose_name='话题')),
                ('count', models.PositiveIntegerField(default=0, verbose_name='关注度')),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=11, unique=True, verbose_name='手机号')),
                ('nickname', models.CharField(max_length=64, verbose_name='昵称')),
                ('avatar', models.CharField(max_length=64, null=True, verbose_name='头像')),
                ('token', models.CharField(blank=True, max_length=64, verbose_name='用户Token')),
                ('fans_count', models.PositiveIntegerField(default=0, verbose_name='粉丝数')),
                ('balance', models.PositiveIntegerField(default=0, verbose_name='账户余额')),
                ('session_key', models.CharField(max_length=32, verbose_name='微信会话密钥')),
                ('option', models.CharField(max_length=32, verbose_name='微信用户唯一标识')),
                ('follow', models.ManyToManyField(blank=True, related_name='_userinfo_follow_+', to='api.UserInfo', verbose_name='关注')),
            ],
        ),
        migrations.CreateModel(
            name='NewsDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(help_text='用于以后在腾讯对象存储中删除', max_length=128, verbose_name='腾讯对象存储中文件名')),
                ('cos_path', models.CharField(max_length=128, verbose_name='腾讯对象存储中图片路径')),
                ('news', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.news', verbose_name='动态')),
            ],
        ),
        migrations.AddField(
            model_name='news',
            name='topic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.topic', verbose_name='话题'),
        ),
        migrations.AddField(
            model_name='news',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='news', to='api.userinfo', verbose_name='发布者'),
        ),
    ]
