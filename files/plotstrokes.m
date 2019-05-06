function plotstrokes(strokes)
%Plots results in 2D
%   strokes - results copied from the data collection tool
temp = strokes;
[m,n] = size(temp);
g = ceil(sqrt(m));
figure();
for i = 1:m
    c = temp{i,1};
    [cm,cn] = size(c);
    subplot(g, g, i);
    for j = 1:cm  
        plot(c{j}(:,1),c{j}(:,2),'-o');
        hold on;
    end
    hold off;
end
end

