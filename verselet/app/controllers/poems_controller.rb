class PoemsController < ApplicationController
  before_action :set_poem, only: [:show, :update, :destroy]

  def index
    poems = Poem.all

    render json: poems
  end

  def show
    render json: poem
  end

  def create
    poem = Poem.new(poem_params)

    if poem.save
      render json: poem, status: :created, location: poem
    else
      render json: poem.errors, status: :unprocessable_entity
    end
  end

  def destroy
    poem.destroy
  end

  private
    def set_poem
      @poem = Poem.find(params[:id])
    end

    def poem_params
      params.require(:poem).permit(:title, :body, :poet_id)
    end
end
